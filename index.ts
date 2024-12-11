import {Tag} from "./src/tag/Tag";
import {BinaryCompression, Edition, SNBTCompression} from "./src/FileFormat";
import NBTError from "./src/NBTError";
import {gzip, inflate} from "pako";
import CompoundPayload from "./src/tag/payloads/CompoundPayload";
import * as JSONBig from 'json-bigint'

export default class NBT {
    private rootTag: Tag;

    constructor(rootTag: Tag) {
        if (!rootTag.isRoot())
            throw new NBTError('Must be a root tag');
        this.rootTag = rootTag;
    }

    static parseJSON(json: object): NBT {
        return new NBT(Tag.fromJSON({'': json}, true));
    }

    static parseSNBT(snbt: string): NBT {
        return new NBT(new Tag('', CompoundPayload.fromSNBTValue(snbt), true));
    }

    static parseNBT(data: Uint8Array, edition: Edition, compression ?: BinaryCompression): NBT {
        if (!compression) {
            if (data[0] === 0x1f && data[1] === 0x8b)
                compression = 'gzip';
            else if (data[0] <= 0x0c)
                compression = 'none';
            else
                throw new NBTError('Unknown compression type');
        }
        if (compression === 'gzip') {
            data = inflate(data);
        }
        return new NBT(Tag.fromUint8Array(data, edition, true));
    }

    toJSON(): object {
        return this.rootTag.toJSON();
    }

    toJSONString(): string {
        return JSONBig.stringify(this.toJSON());
    }

    toSNBT(compress: SNBTCompression): string {
        return this.rootTag.toSNBT(compress);
    }

    toNBT(compression: BinaryCompression = 'none', edition: Edition): Uint8Array {
        if (compression === 'gzip')
            return gzip(this.rootTag.toUint8Array(edition));
        return this.rootTag.toUint8Array(edition);
    }

    getRootTag(): Tag {
        return this.rootTag;
    }

    setRootTag(rootTag: Tag): void {
        if (!rootTag.isRoot())
            throw new NBTError('Must be a root tag');
        this.rootTag = rootTag;
    }
};