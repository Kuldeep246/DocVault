"use client"

import DropzoneComponent from 'react-dropzone'
import { cn } from "@/lib/utils"
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/firebase'
import toast from 'react-hot-toast'

const Dropzone = () => {
    const [loading, setLoading] = useState(false)
    const { isLoaded, isSignedIn, user } = useUser();

    const onDrop = (accepetedFiles: File[]) => {
        accepetedFiles.forEach((file) => {
            const render = new FileReader();

            render.onabort = () => console.log("file reading was aborted");
            render.onerror = () => console.log("file reading has failed");
            render.onload = async () => {
                await uploadPost(file);
            };
            render.readAsArrayBuffer(file);

        });
    };
    const uploadPost = async (selectedFile: File) => {
        if (loading || !user) {
            return;
        }

        setLoading(true);
        const toastId=toast.loading("Uploading...");

        try {
            const docRef = await addDoc(collection(db, "users", user.id, "files"), {
                userId: user.id,
                filename: selectedFile.name,
                fullName: user.fullName,
                profileImg: user.imageUrl,
                timestamp: serverTimestamp(),
                type: selectedFile.type,
                size: selectedFile.size,
            });

            const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
            await uploadBytes(imageRef, selectedFile);
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
                downloadURL: downloadURL,
            });
            toast.success("Uploded Successfully",{
            id:toastId,
            });
        } catch (error) {
            console.error("Error during file upload or updating download URL:", error);
        } finally {
            setLoading(false);
        }
    };

    const maxSize = 20971520; //20mb
    return (
        <DropzoneComponent minSize={0}
            maxSize={maxSize}
            onDrop={onDrop}
        >
            {({ getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                fileRejections }) => {

                const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
                return (
                    <section className='m-4'>
                        <div {...getRootProps()}
                            className={cn(
                                "w-full h-52 flex justify-center cursor-pointer  items-center p-5 border border-dashed rounded-lg text-center",
                                isDragActive ? "bg-[#035FFE] text-white animate-pulse"
                                    : " bg-slate-100/50 dark:bg-slate-800/80 text-slate-400")}>
                            <input {...getInputProps()} />
                            {!isDragActive && "Click hear or drop a file to upload"}
                            {isDragActive && !isDragReject && "Drop to upload this file!"}
                            {isDragReject && "File type not accepted !"}
                            {isFileTooLarge && (<div className='text-danger mt-2 '>File is too large.</div>)}
                        </div>
                    </section>
                )

            }}
        </DropzoneComponent>
    )
}

export default Dropzone
