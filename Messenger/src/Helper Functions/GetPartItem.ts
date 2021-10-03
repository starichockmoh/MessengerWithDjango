import {ParticipantType} from "../Types/Types";

export const GetPartItem = (array: Array<ParticipantType>, ID: number | undefined, search: 'name' | 'photo') => {
    let name = ''
    let photo = ''
    array.forEach(p => {
        if (p.pk !== ID) {
            search === "photo" ? photo = p.addit_image[p.addit_image.length - 1]?.image : name = p.first_name
        }
    })
    if (search === "photo") return photo
    return name
}