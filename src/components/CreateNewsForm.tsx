import { useState } from "react";
import axios from "axios";
import { INewsPayload, Tag } from "../types";
import Spinner from "./Spinner";
import { api } from "../lib/api";
import { X } from "lucide-react";

export default function CreateNewsForm({ tags, loadStats }: { tags: Tag[], loadStats: any }) {
  const [image, setImage] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const createNews = async (e) => {
    try {
      setSubmitting(true);
      e.preventDefault();
      const imageUrl = await handleUploadImage();
      const allTags = await api.getAllTags();

      const uniqueSelectedTags = Array.from(new Set(selectedTags));

      await api.createNews({
        title,
        content,
        image_url: imageUrl,
        tagIds: allTags
          .map(
            (tag) => uniqueSelectedTags.find((e) => e == tag.name) && tag._id
          )
          .filter(Boolean) as any,
      });
      
      loadStats();
      setTitle('');
      setContent('');
      setImage('');
      setSelectedTags([]);
    } catch (error) {
      console.error("createNews failed:", error);
    } finally {
      setSubmitting(false);
    }
  };
  

  const handleTagsSelection = (event) => {
    setSelectedTags((prev) => [event.target.value, ...prev]);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setImageLoaded(false);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader);
        setImageLoaded(true);
        setImage(reader.result); // Base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePastedImgUrl = (event) => {
    const url = event.target.value;
    setImageLoaded(false);
    setImage(url);
  };

  const handleClearImage = () => {
    setImage("");
  };

  const handleRemoveSelectedTags = (tagName: string) => {
    setSelectedTags(prev => prev.filter(_tag => 
      _tag !== tagName 
    ))
  }

  const handleUploadImage = async () => {
    if (!image) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "zfrivduh");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddeh31zhy/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form onSubmit={createNews}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            News Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            What do you want to share with the world?
          </p>

          <div className="mt-10 grid gap-x-6 gap-y-8">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  required
                  onChange={(ev) => setTitle(ev.target.value)}
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base border-amber-100 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="content"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  required
                  rows={3}
                  onChange={(ev) => setContent(ev.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Tags
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="tags"
                  name="tags"
                  required
                  multiple
                  value={selectedTags}
                  onChange={handleTagsSelection}
                  autoComplete="tags-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  {tags.map((tag) => (
                    <option key={tag._id}>{tag.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <fieldset>
          <legend className="text-sm/6 font-semibold text-gray-900">
            Selected Tags
          </legend>
          {/* <p className="mt-1 text-sm/6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
          <div className="mt-6 flex gap-5 flex-wrap">
            {!tags?.length ? (
              <Spinner size={3} />
            ) : (
              Array.from(new Set(selectedTags)).map((tagName, i) => (
                <div className="flex items-center gap-x-3">
                  <input
                    key={i}
                    id={tagName}
                    name={tagName}
                    type="radio"
                    hidden
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <X size={20} className="text-red-500 cursor-pointer" onClick={() => handleRemoveSelectedTags(tagName)} />
                  <label
                    htmlFor={tagName}
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    {tagName}
                  </label>
                </div>
              ))
            )}
          </div>
        </fieldset>

        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            {!image ? (
              <div className="text-center">
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      required
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
                <div className="mt-3 border border-gray-900/25 rounded-md">
                  <input
                    type="text"
                    name="pastedUrl"
                    id="pastedUrl"
                    onChange={handlePastedImgUrl}
                    className="px-3 py-2 rounded-md"
                    placeholder="Paste image url"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                {!image ? (
                  <Spinner />
                ) : (
                  <>
                    <img
                      src={image}
                      alt="Uploaded"
                      onLoad={() => setImageLoaded(true)}
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                    {imageLoaded && <button
                      type="button"
                      onClick={handleClearImage}
                      className="mt-3 rounded-md py-2 text-white text-sm/6 font-semibold bg-red-600 hover:bg-red-500"
                    >
                      Clear
                    </button>}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className=" flex flex-row rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className={submitting && 'mr-5' || ''}>Publish</span> { submitting && <Spinner size={3} color={'LIGHT'} padding={false} /> }
        </button>
      </div>
    </form>
  );
}
