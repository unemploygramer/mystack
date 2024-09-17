import React from 'react'
import Image from 'next/image'
function Title() {

return (
<div className=" mt-[100px] flex flex-col items-center m-0 p-0 ">
<h1 className="text-3xl">
Affirmly
</h1>
    <Image
    className="w-[90vw max-w-[100px] rounded-full m-2"
      src="/affirmlyLogo.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
<h2 className="text-xl ">Think it, Speak it, Believe it</h2>

</div>
)




}
export default Title;