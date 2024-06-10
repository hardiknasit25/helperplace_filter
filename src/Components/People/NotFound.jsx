import notfound from '../../assets/notfound.png'

function NotFound() {
  return (
    <div className='flex flex-col gap-10 justify-center items-center w-auto h-60 p-25 mt-8'>
      <img src={notfound} alt='not found img' className='w-[268px] h-[190px]'/>
      <span className='text-[#054A84] text-xl'>To find available candidates, you just need to adjust your search criteria.</span>
    </div>
  )
}

export default NotFound