'use client'

import Nav from '@/components/site/Nav'
import { usePathname } from 'next/navigation'
import React from 'react'

const SiteLayout = (props) => {

    const pathname = usePathname()

    return (
        <div>
            {pathname != '/verificacaodeconta' ? <Nav/> : null}
            <div>{props.children}</div>
        </div>
    )
}

export default SiteLayout