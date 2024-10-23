import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Username must be at least 3 characters" }),
	password: z
		.string()
		.min(5, { message: "Password must be at least 5 characters" }),
});

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			loginSchema.parse({ username, password });

			const response = await fetch(" http://127.0.0.1:5555/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) throw new Error("Login failed");

			await response.json();
			navigate("/Dashboard");
		} catch (err) {
			toast({
				variant: "destructive",
				title: "Login Error",
				description:
					err instanceof Error ? err.message : "An unknown error occurred",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Welcome Back
					</CardTitle>
					<CardDescription className="text-center">
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleLogin}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="Enter your username"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								required
							/>
						</div>
					</CardContent>
					<CardFooter className=" flex flex-col space-y-4">
						<Button
							className="w-full hover:bg-blue-50 rounded-md"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Logging in...
								</>
							) : (
								"Log in"
							)}
						</Button>
						<p className="text-sm text-center">
							Don't have an account?{" "}
							<Link to="/register" className="text-blue-600 hover:underline">
								Register now!
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
};

export default Login;
