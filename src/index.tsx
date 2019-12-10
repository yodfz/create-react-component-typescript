import { useRef, useEffect, useState } from "react";
type opt = {
  /**
   * 需要抠图的资源图片
   */
  imgId:string;

  /**
   * 抠图完成回调方法
   */
  getMattingImg:()=>void;

  /**
   * 打开客服
   */
  openCustomer:()=>void;
}

// React.FC<props>
/**
 * 消息通知组件 
 * @param {string} opt.imgId 需要抠图的资源图片
 * @param {function} opt.getMattingImg 抠图完成回调方法
 * @param {function} opt.openCustomer 打开
 */
export default function ToolToMattingMessageService(props:opt):JSX.Element {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [url] = useState(props.imgId);
  useEffect(() => {
    const receiveMessage = (e:any) => {
      const data:any = e.data;
      const lists:any = {
        QUIT_CUSTOMER_MATTING: () => {
          // console.log("退出手动抠图");
          // if (iframeRef.current) {
          //   document.body.removeChild(iframeRef.current);
          // }
        },
        OPEN_BUY_VIP: () => {
          // console.log("要求打开VIP购买页");
        },
        OPEN_CUSTOMER_SERVICE: () => {
          console.log("唤起客服");
          // if (Udesk) {
          //   Udesk.showPanel();
          // }
        },
        SEND_CUSTOM_MATTING: (payLoad:any) => {
          console.log("抠图完成，要求画布展示", payLoad);
          // if (opt.getMattingImg) {
          //   opt.getMattingImg(payLoad.imgId);
          // }
        }
      };
      const fn = lists[data.type]
      console.log("APP收到消息", data, fn);
      if (fn) {
        fn(data.payLoad || {});
      }
    };
    window.addEventListener("message", receiveMessage);
    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);
  return <iframe ref={iframeRef} src={url} title="手动抠图" />;
}
