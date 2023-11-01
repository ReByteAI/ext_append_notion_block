import { ActionArgs } from "./action_args.ts";
import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";

export async function rebyte_main({ context, args }: {
  context: any;
  args: ActionArgs;
}) {
  console.log("rebyte main args", args)
  console.log("rebyte main context", context)

  try {
    if (!args.notion_api_key) {
      throw new Error("notion_api_key is required")
    }
    if (!args.block_id) {
      throw new Error("block_id is required")
    }
    if (!args.children) {
      throw new Error("children is required")
    }
    const notion = new Client({
      auth: args.notion_api_key,
    })
    const response = await notion.blocks.children.append({
      block_id: args.block_id,
      children: JSON.parse(args.children),
      after: args.after ? args.after : undefined
    })
    const block_ids = response?.results?.map((it) => it.id)
    if (!!block_ids?.length) {
      console.log("append notion block success, block_ids:", block_ids)
      return {
        args,
        block_ids,
      }
    } else {
      console.log("append notion block failed", response)
      return {
        args
      }
    }
  } catch (e) {
    console.error("append notion block error:", e?.message)
    console.error(e)
    return {
      args
    }
  }
}


// rebyte_main({
//   context: null, args: {
//     notion_api_key: "secret_Y1iSqdbzZpX5vfCxNTs0DF5lwFFy7fM07OeX51ZXE77",
//     block_id: "8417a19b1b85447f939523414c068fc2",
//     children: JSON.stringify([
//       {
//         "heading_2": {
//           "rich_text": [
//             {
//               "text": {
//                 "content": "Lacinato kale"
//               }
//             }
//           ]
//         }
//       },
//       {
//         "paragraph": {
//           "rich_text": [
//             {
//               "text": {
//                 "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
//                 "link": {
//                   "url": "https://en.wikipedia.org/wiki/Lacinato_kale"
//                 }
//               }
//             }
//           ]
//         }
//       }
//     ])
//   }
// })
