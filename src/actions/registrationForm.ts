"use server";
import { createTim } from "@/queries/tim.query";
import { Jenjang, Tipe } from "@prisma/client";
import { imageUploader } from "./fileUploader";
import { revalidatePath } from "next/cache";

export default async function submitFormRegistrasi(
  data: FormData,
  userId: string
) {
  const nama_tim = data.get("namatim") as string;
  const pelatih = data.get("pelatih") as string;
  const asal_sekolah = data.get("asal") as string;
  const jenjang = data.get("jenjang") as Jenjang;
  const tipe_tim = data.get("size") as Tipe;
  const bukti = data.get("bukti") as File;
  const bank = data.get("namabank") as string;
  const nama_rek = data.get("namarek") as string;
  const tipe_pembayaran = data.get("tipe-pembayaran") as string;
  const no_pelatih = data.get("no-pelatih") as string;
  const maskot = data.get("no-maskot") as File;

  try {
    let maskotPic;
    const tryUploadImage = await imageUploader(
      Buffer.from(await bukti.arrayBuffer())
    );
    if (jenjang === "SMA")
      maskotPic = await imageUploader(Buffer.from(await maskot.arrayBuffer()));
    await createTim({
      nama_tim,
      asal_sekolah,
      jenjang,
      pelatih,
      tipe_tim,
      foto_mascot: maskotPic?.data?.url,
      no_pelatih,
      user: { connect: { id: userId } },
      pembayaran: {
        create: {
          bank,
          bukti_tf: tryUploadImage.data?.url!,
          nama_rek,
          isDP: tipe_pembayaran === "TRUE" ? true : false,
        },
      },
    });
    revalidatePath("/", "layout");
    return { success: true, message: "Berhasil membuat Tim!" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Gagal membuat Tim" };
  }
}
