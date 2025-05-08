import { Ban } from "lucide-react";
import BackButton from "./BackButton";

export function ErrorScreen({ message }: { message: string }) {
    return (
        <main className="flex items-center justify-center bg-red-400 min-h-screen p-5">
            <div className="w-full max-w-xl p-5 rounded-xl flex flex-col items-center gap-2 text-red-500 bg-white relative">
                <BackButton title="Volver" link="/" />
                <h1 className="font-medium text-center">{message}</h1>
                <Ban />
            </div>
        </main>
    );
}