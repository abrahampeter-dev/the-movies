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

                <div className="flex flex-wrap items-center justify-center rounded-full border border-primary-foreground/30 md:w-1/5 w-full text-center">
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
        </div>
    );
}