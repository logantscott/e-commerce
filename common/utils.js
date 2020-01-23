export default function findById(cartItemID, boxesArray) {
    let match;
    boxesArray.forEach(boxItem => {if (cartItemID === boxItem.id) match = boxItem;});
    return match;
}