import React from "react";
import {Image, Typography} from "antd";

interface ProductImageProps {
    id: string | number;
    size: "large" | "small";
    imageSrc: string;
    price: number | string;
    title: string;
}

export const ProductImage: React.FC<ProductImageProps> = (props) => {
    const { id, size, imageSrc, price, title } = props;
    return (
        <>
            {size === "large" ? <Image src={imageSrc} height={285} width={490} /> 
            : <Image src={imageSrc} width={240} height={120} />}
            <div>
                <Typography.Text type="secondary" ellipsis>
                    {title.length > 25 ? title.slice(0, 25) + "..." : title}
                </Typography.Text>
                <Typography.Text type="danger" strong ellipsis>
                    ￥{price}起
                </Typography.Text>
            </div>
        </>
    );
};