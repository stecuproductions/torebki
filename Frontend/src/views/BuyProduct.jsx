import React from "react";

function BuyProduct({name, id, price}) {
    return (
        <div>
            <h1>{name}</h1>
            <h1>{id}</h1>
            <h1>{price}</h1>
        </div>
    );
}