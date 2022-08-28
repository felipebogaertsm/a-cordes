// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useState } from "react"

// Constants:
import { MEDIA_URL } from "../../../constants"

export default function ImageCarroussel({ images }) {
    const [image, setImage] = useState(
        images && images.length > 0 ? images[0] : null
    )

    return (
        <div>
            <div>
                <img
                    className="
                        aspect-[4/3] mt-10 object-cover
                        w-full rounded-sm shadow-xl
                    "
                    src={`${MEDIA_URL}${image.src}`}
                    alt={image.alt ? image.alt : ""}
                ></img>
            </div>
            <div className="my-2"></div>
            <div className="overflow-x-scroll no-scrollbar flex flex-row">
                {images.map((image) => (
                    <div
                        key={image._id}
                        onClick={(e) =>
                            setImage(
                                images.filter(
                                    (item) => item._id == image._id
                                )[0]
                            )
                        }
                        className="cursor-pointer opacity-80 hover:opacity-100 transition-all duration-100"
                    >
                        <img className="rounded-sm w-20" src={image.src}></img>
                    </div>
                ))}
            </div>
        </div>
    )
}
