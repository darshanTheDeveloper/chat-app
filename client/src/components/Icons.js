import './styles.css'
import Account from './Account';
import Settings from './Settings';

export default function Icons() {
  return (
    <div className='Icons'>
      <i className="fa-brands fa-whatsapp fa-xl" style={{ color: 'springgreen' }}></i>
      <div>
        <Account />
        <Settings/>
      </div>
    </div>
  )
}
