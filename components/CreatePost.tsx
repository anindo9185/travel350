import { LinkIcon, PhotoIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import client from "../apollo-client";
import { toast } from "react-hot-toast";
import CreatePost from "./CreatePost";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
  location: string;
};

type Props = {
  subreddit?: string;
};

function PostBox({ subreddit }: Props) {
  const { data: session } = useSession();

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form className="sticky top-20 z-50 bg-white border rounded-md border-gray-300 p-2 ">
      <div>Share Trip Expereinces</div>

      <div className="flex items-center space-x-3">
        <input
          {...register("postTitle", { required: true })}
          type="text"
          disabled={!session}
          className="rounded-md flex-1 bg-gray-50 p-2 pl-5 outline-none"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : `Share your trip experience`
              : `Sign in you fool`
          }
        />

        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && `text-blue-300`
          }`}
        />
      </div>
      <div className="flex flex-col py-2">
        {/* Date */}

        <div className="flex items-center px-2">
          <p className=" min-w-[90px]">Start Date</p>
          <input
            type="date"
            {...register("postBody")}
            className="m-2 bg-blue-50 p-2 outline-none"
            placeholder="Text (optional)"
          />

          <p className=" min-w-[90px]">End Date</p>
          <input
            type="date"
            {...register("postBody")}
            className="m-2 bg-blue-50 p-2 outline-none"
            placeholder="Text (optional)"
          />
        </div>

        {/* Location*/}
        {!subreddit && (
          <div className="flex items-center px-2">
            <p className=" min-w-[90px]">Location</p>
            <input
              type="text"
              {...register("location", { required: true })}
              className="flex-1 m-2 bg-blue-50 p-2 outline-none"
              placeholder="i.e. React"
            />
          </div>
        )}
        {/* Body */}
        <div className="flex items-center px-2">
          <p className=" min-w-[90px]">Details</p>
          <input
            type="text"
            {...register("postBody")}
            className="flex-1 m-2 bg-blue-50 p-2 outline-none"
            placeholder="Text (optional) box lomba hobe"
          />
        </div>

        {/* subreddit */}
        {!subreddit && (
          <div className="flex items-center px-2">
            <p className=" min-w-[90px]">Forum</p>
            <input
              type="text"
              {...register("subreddit", { required: true })}
              className="flex-1 m-2 bg-blue-50 p-2 outline-none"
              placeholder="i.e. React"
            />
          </div>
        )}

        {/* imagebox */}
        {imageBoxOpen && (
          <div className="flex items-center px-2">
            <p className=" min-w-[90px]">Image URL:</p>
            <input
              type="text"
              {...register("postImage")}
              className="flex-1 m-2 bg-blue-50 p-2 outline-none"
              placeholder="optional"
            />
          </div>
        )}

        {/* Errors */}
        {Object.keys(errors).length > 0 && (
          <div className="space-y-2 p-2 text-red-500">
            {errors.postTitle?.type === "required" && (
              <p>- A post title is required</p>
            )}

            {errors.subreddit?.type === "required" && (
              <p>-Subreddit is required</p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default PostBox;
