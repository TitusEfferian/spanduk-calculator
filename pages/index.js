import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react'

const LazyHome = dynamic(() => import('../RoutesComponent/Home'), {
  ssr: false,
})

export default function Home() {
  return (
    <LazyHome />
  )
}
