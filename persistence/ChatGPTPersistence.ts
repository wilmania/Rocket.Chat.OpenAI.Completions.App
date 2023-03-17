import { IPersistence, IPersistenceRead, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';


export class SystemInstructionPersistence {
    // add a record
    public static async get(read: IRead, user_id: string): Promise<string> {

        const associations: Array<RocketChatAssociationRecord> = [
            new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'user_system_instruction'),
            new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user_id),
        ];

        const records: any = await read.getPersistenceReader().readByAssociations(associations);
        return records
    }

    public static async update(persist: IPersistence, user_id: string, instruction:string): Promise<boolean> {
        const associations: Array<RocketChatAssociationRecord> = [
            new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'user_system_instruction'),
            new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user_id),
        ];

        try {
            await persist.updateByAssociations(associations, { instruction }, true);
        } catch (err) {
            return false;
        }
        return true;
    }

}