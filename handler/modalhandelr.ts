import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Client,
  ModalBuilder,
} from "discord.js";
import modalSchema from "./models/modalSchema";
import { modalExports } from "./setup";

export async function CreateModal(options: {
  name: string;
  client: Client;
  data?: any;
  deleteAfter: number;
  interaction:
    | ButtonInteraction
    | AnySelectMenuInteraction
    | ChatInputCommandInteraction;
}) {
  console.log(options);
  const modalobject = modalExports.find(
    (modalexport) => modalexport.name == options.name
  );
  if (!modalobject) {
    console.log("modal not found");
    return;
  }
  const modal = new ModalBuilder();

  const modaldb = new modalSchema();
  modaldb.modalName = options.name;
  modaldb.data = options.data;

  await modaldb.save();
  modal.setCustomId(modaldb.id);
  await modalobject.create(
    {
      client: options.client,
      interaction: options.interaction,
      data: options.data,
    },
    modal
  );
  setTimeout(() => {
    modalDelete(modaldb.id);
  }, options.deleteAfter * 1000);
}

async function modalDelete(modalId: string) {
  const modaldb = await modalSchema.findById(modalId);
  if (!modaldb) {
    return;
  }
  modaldb.delete();
}
