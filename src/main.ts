import { ActionArgs } from "./action_args.ts";
import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";

export async function rebyte_main({ context, args }: {
  context: any;
  args: ActionArgs;
}) {
  console.log("rebyte main args", args)
  console.log("rebyte main context", context)

  const notion = new Client({
    auth: args.notion_api_key,
  })

  try {
    const response = await notion.blocks.children.append({
      block_id: args.parent,
      children: args.blocks ? JSON.parse(args.blocks) : null
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
    console.error("append notion block error", e)
    return {
      args
    }
  }
}
