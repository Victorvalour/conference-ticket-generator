"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CloudDownload, Upload } from "lucide-react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import firebaseApp from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useTicketStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"

const storage = getStorage(firebaseApp)

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  avatar: z.string().url("Please upload an image"),
  specialRequest: z.string().optional(),
})

export function AttendeeForm() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { setField } = useTicketStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
      specialRequest: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setField("name", values.name);
    setField("email", values.email);
    setField("specialRequest", values.specialRequest ?? "");
    
    console.log("Stored Values:", useTicketStore.getState()); // Debugging
  
    router.push("/ticket");
  }
  

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      setUploadProgress(0)

      const fileName = new Date().getTime() + "-" + file.name
      const storageRef = ref(storage, `avatars/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
        },
        (error) => {
          console.error("Error uploading image:", error)
          setIsUploading(false)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          form.setValue("avatar", downloadURL)
          setField("avatarUrl", downloadURL)
          setIsUploading(false)
        },
      )
    } catch (error) {
      console.error("Error uploading image:", error)
      setIsUploading(false)
    }
  }

  return (
    <Card className="max-w-3xl mx-auto bg-[#041E23] text-white border-teal-900">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-normal">Attendee Details</CardTitle>
          <span className="text-sm text-gray-400">Step 2/3</span>
        </div>
        <Progress value={66} className="h-1" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="border-2 border-[#07373F] rounded-2xl py-4 px-2 bg-[#052228] ">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Upload Profile Photo</FormLabel>
                      <FormControl>
                        <div className="relative h-40 w-[70%] mx-auto bg-[#011920] rounded-2xl">
                  
                        
                          <div
                            className={`relative h-full w-40 mx-auto rounded-2xl border-[3px] border-dashed border-[#24A0B5] flex items-center bg-[#0E464F] justify-center ${
                              field.value ? "bg-teal-400/10" : "bg-transparent"
                            }`}
                          >
                            {field.value ? (
                              <Image
                                src={field.value || "/placeholder.svg"}
                                alt="Profile"
                                className="h-full w-full object-cover rounded-lg"
                                width={100}
                                height={100}
                              />
                            ) : (
                              <div className="text-center">
                                <CloudDownload className="h-10 w-10 mx-auto text-teal-400" />
                                <p className="text-sm text-gray-400 mt-2">Drag & drop or click to upload</p>
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={handleImageUpload}
                              disabled={isUploading}
                            />
                        
                          </div>
                          
                        
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

{isUploading && (
                  <div className="mt-2">
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Enter your name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-transparent border-teal-900 focus-visible:ring-teal-400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Enter your email *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="bg-transparent border-teal-900 focus-visible:ring-teal-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialRequest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Special request?</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-transparent border-teal-900 focus-visible:ring-teal-400 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-[200px] border-teal-900 text-gray-400 hover:text-white hover:border-teal-400"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button type="submit" className="w-[200px] bg-teal-400 text-black hover:bg-teal-500">
                Get My Free Ticket
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

