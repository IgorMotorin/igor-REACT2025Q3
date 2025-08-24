import { useState } from 'react';
import * as React from 'react';

const FileForm = ({ error }: { error: { message: string } | undefined }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };
  const fileData = () => {
    if (selectedFile) {
      return (
        <div className={'text-sm mb-1 text-green-800 text-left'}>
          <h2 className={'font-bold'}>File Details</h2>
          <p>File Name: {selectedFile?.name}</p>
          <p>File Type: {selectedFile?.type}</p>
          <p>
            Last Modified: {new Date(selectedFile?.lastModified).toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div className={'text-base'}>
          <span className="mb-2 block text-medium font-semibold text-[#07074D]">
            Choose image
          </span>
        </div>
      );
    }
  };
  return (
    <div className="mb-3">
      <input
        onChange={onFileChange}
        required={true}
        type="file"
        name="file"
        id="file"
        className="sr-only"
        accept=".jpg,.png,"
      />
      <label
        htmlFor="file"
        className="relative flex min-h-[100px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-2 text-center"
      >
        <div>
          {fileData()}
          <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
            Browse
          </span>
        </div>
      </label>

      {!!error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
};

export default FileForm;
