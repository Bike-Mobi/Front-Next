import Nav from '@/components/Nav'
import React from 'react'

const SiteLayout = (props) => {
    return (
        <div>
            <Nav />
            <div>{props.children}</div>
        </div>
    )
}

export default SiteLayout