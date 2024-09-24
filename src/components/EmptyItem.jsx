/* eslint-disable react/prop-types */


const EmptyItem = ({message=""}) => {
  return (
    <section className="h-full flex justify-center items-center">
      <p> { message }</p>
    </section>
  )
}

export default EmptyItem