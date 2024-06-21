import { Message } from "@/UserModal/User"
export interface ApiResponse {
    message: string,
    success: boolean,
    isAcceptingMessage?: boolean,
    messages?:Array<Message>
}