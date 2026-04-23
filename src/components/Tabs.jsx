import { useState } from "react";

export const Tabs = ({ title, items, defaultTab }) => {

    const [activeTab, setActiveTab] = useState(defaultTab || items?.[0]?.id);

    return (
        <div className="">
            {/* Header */}
            <div className="px-4 py-4 flex flex-wrap items-center gap-2">
                <span className="text-sm md:text-2xl font-bold leading-tight">
                    {title}
                </span>

                <div className="flex flex-wrap items-center justify-center rounded-full border-2 border-primary-foreground/30 md:w-1/5 w-full text-center">
                    {items.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 rounded-full py-2 px-2 cursor-pointer transition-all
                                ${activeTab === tab.id
                                    ? "bg-primary/90 hover:bg-primary opacity-100"
                                    : "opacity-50 hover:opacity-80"
                                }`}
                        >
                            <span>{tab.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="pt-1 px-4">
                {items.find((tab) => tab.id === activeTab)?.content}
            </div>
            {/* <div className="pt-1 px-4 h-80">
                <div className="line-clamp-6">
                    {items.find((tab) => tab.id === activeTab)?.content}
                </div>
            </div> */}
        </div>
    );
}


// import { useState, useRef, useEffect } from "react";

// export const Tabs = ({ title, items, defaultTab }) => {
//     const [activeTab, setActiveTab] = useState(defaultTab || items?.[0]?.id);
//     const [height, setHeight] = useState(0);
//     const contentRef = useRef(null);

//     useEffect(() => {
//         if (contentRef.current) {
//             setHeight(contentRef.current.scrollHeight);
//         }
//     }, [activeTab]);

//     return (
//         <div>
//             {/* Header */}
//             <div className="px-4 py-4 flex flex-wrap items-center gap-2">
//                 <span className="text-sm md:text-2xl font-bold leading-tight">{title}</span>
//                 <div className="flex flex-wrap items-center justify-center rounded-full border-2 border-primary-foreground/30 md:w-1/5 w-full text-center">
//                     {items.map((tab) => (
//                         <div
//                             key={tab.id}
//                             onClick={() => setActiveTab(tab.id)}
//                             className={`flex-1 rounded-full py-2 px-2 cursor-pointer transition-all ${activeTab === tab.id
//                                     ? "bg-primary/90 hover:bg-primary opacity-100"
//                                     : "opacity-50 hover:opacity-80"
//                                 }`}
//                         >
//                             <span>{tab.title}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Content */}
//             <div
//                 className="pt-1 px-4 transition-[height] duration-300"
//                 style={{ height }}
//             >
//                 <div ref={contentRef}>
//                     {items.find((tab) => tab.id === activeTab)?.content}
//                 </div>
//             </div>
//         </div>
//     );
// };
