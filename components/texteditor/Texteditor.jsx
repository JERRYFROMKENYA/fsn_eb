"use client"
import dynamic from 'next/dynamic';

const TexteditorClient = dynamic(() => import('./TexteditorClient'), { ssr: false });

const Texteditor = (props) => {
    return <TexteditorClient {...props} />;
};

export default Texteditor;