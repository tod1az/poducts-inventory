"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Product } from "@/lib/types"

export default function Card({ product }: { product: Product }) {
  const [showModal, setShowModal] = useState(false)
  const [quantity, setQuantity] = useState(10)

  const handleQuantityChange = (value: number) => {
    setQuantity(value)
  }
  return (
    <>
      <div className="bg-slate-800 p-6 rounded-lg shadow-md min-w-[48vw] w-full md:w-[90%]  hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">{product.description}</h3>
            <div className="flex  gap-4 items-center text-muted-foreground">
              <p>Codigo: {product.code}</p>
              <p>Family: {product.family}</p>
            </div>
          </div>
          <div className="flex  items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <PackageIcon className="w-5 h-5" />
              <span>Cantidad: {product.quantity}</span>
            </div>
            <Button size="sm" onClick={() => setShowModal(true)}>
              Modificar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function PackageIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}
