import { FiShare } from "react-icons/fi";
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  HatenaShareButton,
  HatenaIcon,
  OKShareButton,
  OKIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

const Share = ({ id }) => {
  const shareUrl = `http://localhost:5173/post/${id}`;
  console.log(shareUrl);
  return (
    <div>
      <label htmlFor="my_modal_7" className="">
        <a className="flex items-center border-2 px-2 rounded-full  space-x-1">
          <span>
            <FiShare />
          </span>
          <span>Share</span>
        </a>
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Share</h3>
          <div className="flex justify-between items-center my-10 overflow-x-auto">
            <div className="">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={24} />
              </FacebookShareButton>
              <FacebookShareCount url={shareUrl}>
                {(shareCount) => (
                  <span className="myShareCountWrapper">{shareCount}</span>
                )}
              </FacebookShareCount>
            </div>
            <div>
              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={24}></TwitterIcon>
              </TwitterShareButton>
            </div>
            <div>
              <EmailShareButton url={shareUrl}>
                <EmailIcon size={24}></EmailIcon>
              </EmailShareButton>
            </div>
            <div>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={24}></WhatsappIcon>
              </WhatsappShareButton>
            </div>
            <div>
              <TelegramShareButton url={shareUrl}>
                <TelegramIcon size={24}></TelegramIcon>
              </TelegramShareButton>
            </div>
            <div>
              <RedditShareButton url={shareUrl}>
                <RedditIcon size={24}></RedditIcon>
              </RedditShareButton>
            </div>
            <div>
              <HatenaShareButton url={shareUrl}>
                <HatenaIcon size={24}></HatenaIcon>
              </HatenaShareButton>
            </div>
            <OKShareButton url={shareUrl}>
              <OKIcon size={24}></OKIcon>
            </OKShareButton>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default Share;
