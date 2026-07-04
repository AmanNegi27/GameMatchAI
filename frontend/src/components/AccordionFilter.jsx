import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

function AccordionFilter({ title, children }) {

    const [isOpen, setIsOpen] = useState(false);

    return (

        <div className="bg-slate-700 rounded-xl overflow-hidden">

            <button
                className="
                    w-full
                    flex
                    justify-between
                    items-center
                    p-4
                    text-white
                    hover:bg-slate-600
                    transition
                "
                onClick={() => setIsOpen(!isOpen)}
            >

                <span className="font-semibold">
                    {title}
                </span>

                {

                    isOpen ?

                        <FaChevronDown />

                        :

                        <FaChevronRight />

                }

            </button>

            {

                isOpen && (

                    <div className="px-4 pb-4">

                        {children}

                    </div>

                )

            }

        </div>

    );

}

export default AccordionFilter;