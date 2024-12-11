# @avensaas/nbt-parser

Minecraft NBT (NamedBinary Tags) parser for Node.js with Typescript support

## Supports

- Java & Bedrock(Not tested) edition
- Parsing NBT / SNBT to JSON
- Dumping JSON to NBT

## Installation

```
npm install @avensaas/nbt-parser
```

## Usage

```typescript
// Importing
const NBT = require("@avensaas/nbt-parser");
// or
import NBT from "@avensaas/nbt-parser";

// Parse NBT
const nbt = NBT.parseJSON({ key: "value" });
const nbt = NBT.parseNBT(new Uint8Array([]), "java");
const nbt = NBT.parseSNBT("{key:value}");

// Dumping NBT
nbt.toJSON();
nbt.toJSONString();
nbt.toNBT("gzip", "java");
nbt.toSNBT("formatted");

// Getting tags or payloads
const tag = nbt.getRootTag();
// tag.getTagName(), tag.getTagId() ...
const payload = tag.getPayload();
// payload.getValue(), payload.toSNBTValue(), payload.toUint8Array()...
```

All credits go to the owner of the [source code](https://github.com/Tigercrl/nbt-parser)
