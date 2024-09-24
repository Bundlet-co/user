/* eslint-disable react/prop-types */


const EmptyItem = ({name=""}) => {
  return (
    <section className="h-full flex justify-center items-center">
      <p>No item in your { name }</p>
    </section>
  )
}

export default EmptyItem