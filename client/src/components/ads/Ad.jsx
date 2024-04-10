import "./ad.css"

export default function Ad() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
    <img className="rightbarAd" src={PF + "ad2.png"} alt="" />
    </>
  )
}
