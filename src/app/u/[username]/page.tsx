'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react"
import { messageSchema } from "@/schemas/messageSchema";
import * as z  from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
// import { Content } from "next/font/google";



function Page() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams<{ username: string }>();

  //for ai data
  // const [isSuggesting, setIsSuggesting] = useState(false)
  // const [questions, setQuestions] = useState('')


  const {toast} = useToast()


  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
     Content: ''
    }
  })

  const onSubmit = async(data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/send-message`, {
        username: params.username,
        content: data.Content,
      });

      toast({
        title: "message sent successfully",
        description: response.data.message,
      });

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Unable to send messages",
        description: errorMessage,
        variant: "destructive",
      });
    }finally{
      setIsSubmitting(false);
    }
  }

  // const fetchQuestions = async () => {
  //   setIsSuggesting(true)
  //   setQuestions(''); // Clear previous questions

  //   try {
  //     const response = await axios.post('/api/suggest-messages');

  //     setQuestions(response.data.questions);
  //   } catch (error) {
  //     const axiosError = error as AxiosError<ApiResponse>;
  //     let errorMessage = axiosError.response?.data.message;
  //     toast({
  //       title: "Error in Suggesting Questions",
  //       description: errorMessage,
  //       variant: "destructive"
  //     })
  //   } finally {
  //     setIsSuggesting(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchQuestions(); // Fetch questions on component mount
  // }, []);

  return (
    <>
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-center">Public Profile Link</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 flex flex-col">
          <FormField
            control={form.control}
            name="Content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Send anonymous message to @{params.username}</FormLabel>
                <FormControl>
                  <Input className="h-20 text-start" placeholder="write your anonymous message here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-[8%] self-center" >
            {isSubmitting ? (
              <>
                <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                sending!!
              </>
            ) : (
              " Send "
            )}
          </Button>
        </form>
      </Form>
      {/* <div className=" my-10">
      <Button className="" type="submit" disabled={isSuggesting} onClick={fetchQuestions}>
            {isSuggesting ? (
              <>
                <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                sending!!
              </>
            ) : (
              " Suggest Me "
            )}
          </Button>
          <h2 className="my-5">Click on any message below to select it</h2>
          <div>
            <h1 className="font-semibold text-lg">Messages</h1>
            <div>
              {
                questions.split('||').map((question, index) => (
                  <span className="my-3 p-2 border border-gray-600" key={index}>{question} &nbsp;</span>
                ))
              }
            </div>
          </div>
      </div> */}
    </div>
  
  </>
  );
}

export default Page;
