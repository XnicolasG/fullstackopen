export const Notification = ({ classType,message }) => {
    console.log('');
    
    if (message === null) {
      return null
    }
  
    return (
      <div className={classType ? 'error' : 'message'}>
        {message}
      </div>
    )
  }