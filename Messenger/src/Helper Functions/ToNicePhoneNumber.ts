export const ToNicePhoneNumber = (number: string) => {
    let tt = number.split('')
    // @ts-ignore
    tt.splice(2, "", "  (");
    // @ts-ignore
    tt.splice(6, "", ") ");
    // @ts-ignore
    tt.splice(10, "",  "-");
    // @ts-ignore
    tt.splice(13, "", "-");
    return tt.join('')

}