import {
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom, RoomType } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { AppSetting } from "../config/Settings";
import { SystemInstructionPersistence } from "../persistence/ChatGPTPersistence";

export async function GetUserSystemInstruction(read: IRead, user){

    const { value: OPEN_AI_DEFAULT_INSTRUCTION } = await read
            .getEnvironmentReader()
            .getSettings()
            .getById(AppSetting.OpenAI_CHAT_DEFAULT_SYSTEM_INSTRUCTION);
            // try to get user setting
            const user_instruction = await SystemInstructionPersistence.get(read, user.id)
            if(!user_instruction.length){
                // no persisted per user instruction found
                var instruction = OPEN_AI_DEFAULT_INSTRUCTION as string
            }else{
                var instruction = user_instruction[0]["instruction"] as string
            }
            return instruction;

}