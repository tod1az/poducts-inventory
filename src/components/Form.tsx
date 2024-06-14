"use client"
import { productAddition } from "@/server/queries"
import SubmitButton from "./SubmitButton"
import { Product } from "@/lib/types"
import { useRef } from "react"

export default function Form({ product }: { product: Product }) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form
      className="flex items-center justify-center gap-2"
      action={async (formData) => {
        if (inputRef.current) {
          inputRef.current.value = ""
        }
        const quantity = formData.get("quantity")
        await productAddition(Number(quantity), product.code)
      }}
    >
      <input
        ref={inputRef}
        className="text-black px-2"
        name="quantity"
        type="number"
      />
      <SubmitButton className="p-2 rounded bg-white text-black h-[1.6rem] flex items-center justify-center">
        +
      </SubmitButton>
    </form>
  )
}
