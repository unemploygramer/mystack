
"use client";
import {useEffect,useState} from "react";

export default function fetchRandomWord  () {

  
      const requestBody = {
      //   company: companyValue,
      //   product: productValue,
      //   features: featuresValue,
      //   salesTechnique: salesTechniqueValue,
      //   email: session?.user?.email 
      
    };
    const  WordInput = async()=> {
      try {
        const response = await  fetch(`/api/submitWord`, {
            method:"GET",
        })
        if(response) {
            const data = await response.json();
            console.log(data,"the data")
            
        }
          //  const script = await submitScript.json()
          //  const scriptObject = await JSON.parse(script.savedScript.message.content)
          //  const intro = scriptObject.intro
    
    
          //  await setResponseData(scriptObject)
          //  await setLoading(false);
    // return submitWord
    
   
      
      
    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
    };

// const data = await fetchRandomWord();


  return (
    <div className="flex flex-col items-center justify-center">
     
      <button
        onClick={WordInput}
        className="px-6 py-3 text-lg font-semibold text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Generate
      </button>
    </div>
  );
}

// export default WordInput;
