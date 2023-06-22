"use client";

import uniqid from "uniqid";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

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

      const uniqueID = uniqid();

      // Upload podcast
      // const { data: podcastData, error: podcastError } =
      //   await supabaseClient.storage
      //     .from("podcasts")
      //     .upload(`podcast-${values.title}-${uniqueID}`, podcastFile, {
      //       cacheControl: "3600",
      //       upsert: false,
      //     });

      // if (podcastError) {
      //   setIsLoading(false);
      //   return toast.error("Failed podcast upload");
      // }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      // Create record
      const { error: hostError } = await supabaseClient.from("hosts").upsert(
        {
          name: values.host,
        },
        {
          ignoreDuplicates: true,
        }
      );
      const { error: podcastuploaderror } = await supabaseClient
        .from("podcasts")
        .upsert(
          {
            title: values.title,
            host: values.host,
            description: values.description,
            cover_image_path: imageData.path,
          },
          {
            ignoreDuplicates: true,
          }
        );
      const { error: songuploaderror } = await supabaseClient
        .from("episodes")
        .upsert(
          {
            title: values.episodeTitle,
            host: values.host,
            podcast: values.title,
            episode_number: values.episodeNumber,
            audio_path: values.audioLink,
            cover_image_path: imageData.path,
            description: values.episodeDescription,
          },
          {
            ignoreDuplicates: true,
          }
        );

      if (podcastuploaderror) {
        return toast.error(podcastuploaderror.message);
      }
      if (songuploaderror) {
        return toast.error(songuploaderror.message);
      }
      if (hostError) {
        return toast.error(hostError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Podcast episode added!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
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
          id="episodeTitle"
          disabled={isLoading}
          {...register("episodeTitle", { required: true })}
          placeholder="Episode title"
        />
        <Input
          id="episodeNumber"
          disabled={isLoading}
          {...register("episodeNumber", { required: true })}
          placeholder="Episode number"
        />
        <Input
          id="episodeDescription"
          disabled={isLoading}
          {...register("episodeDescription", { required: true })}
          placeholder="Episode description"
        />
        <div>
          <Input
            id="audioLink"
            disabled={isLoading}
            {...register("audioLink", { required: true })}
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
