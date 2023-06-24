"use client";

import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { nanoid } from "nanoid";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import slugify from "slugify";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      host: "",
      title: "",
      podcast: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      // const podcastFile = values.podcast?.[0];

      if (!imageFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const cover_image_path = "cover_image_" + slugify(values.title);

      // check if podcast exists
      const { data: podcast_data, error } = await supabaseClient
        .from("podcasts")
        .select("*")
        .eq("title", values.title)
        .single();


      const podcast_id = podcast_data ? podcast_data.id : nanoid();

      // if podcast record doesn't exist
      if (!podcast_data) {
        // Upload cover image for podcast
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(cover_image_path, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });

        // if image upload fails, stop and show error
        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed image upload");
        } else {
          // if image upload succeeds, continue
          setIsLoading(false);
          toast.success("Image uploaded!");
        }

        // upload host 
        const { error: hostError } = await supabaseClient
          .from("hosts")
          .upsert({ name: values.host }, { ignoreDuplicates: true });

        if (hostError) {
          return toast.error(hostError.message);
        }
        // upload podcast
        const { error: podcastuploaderror } = await supabaseClient
          .from("podcasts")
          .upsert(
            {
              id: podcast_id,
              title: values.title,
              host: values.host,
              cover_image_path: cover_image_path,
              description: values.description,
            },
            {
              ignoreDuplicates: true,
            }
          );

        if (podcastuploaderror) {
          return toast.error(podcastuploaderror.message);
        }
      } else {
        toast.success("Podcast already exists!")
      }

      const episode_id = nanoid();
      // now at this point we know that the podcast either already exist or is uploaded, so we can upload the episode
      const { error: songuploaderror } = await supabaseClient
        .from("episodes")
        .upsert({
          id: episode_id,
          title: values.episode_title,
          host: values.host,
          podcast_id: podcast_id,
          audio_url: values.audio_url,
          cover_image_path: cover_image_path,
          description: values.episode_description,
          podcast_title: values.title,
        });

      if (songuploaderror) {
        return toast.error(songuploaderror.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Podcast episode added!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a podcast episode"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Podcast title"
        />
        <Input
          id="host"
          disabled={isLoading}
          {...register("host", { required: true })}
          placeholder="Podcast host"
        />
        <Input
          id="description"
          disabled={isLoading}
          {...register("description", { required: true })}
          placeholder="Podcast description"
        />
        <Input
          id="episode_title"
          disabled={isLoading}
          {...register("episode_title", { required: true })}
          placeholder="Episode title"
        />
        {/* <Input
          id="episodeNumber"
          disabled={isLoading}
          {...register("released_date", { required: true })}
          placeholder="released date"
        /> */}
        <Input
          id="episode_description"
          disabled={isLoading}
          {...register("episode_description", { required: true })}
          placeholder="Episode description"
        />
        <div>
          <Input
            id="audio_url"
            disabled={isLoading}
            {...register("audio_url", { required: true })}
            placeholder="Audio Link"
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
