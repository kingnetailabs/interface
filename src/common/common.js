export function getAvatar(item) {
  if (item.avatar) {
    return item.avatar;
  }

  let avatars = {
    0: "https://s3.ap-east-1.amazonaws.com/mira-buckets/avatar/1gos8me722c.png",
    1: "https://s3.ap-east-1.amazonaws.com/mira-buckets/avatar/1gos8me722c.png",
    2: "https://s3.ap-east-1.amazonaws.com/mira-buckets/avatar/1gos8n8qs0p.png",
    3: "https://s3.ap-east-1.amazonaws.com/mira-buckets/avatar/1gos8karlkn.png",
    4: "https://s3.ap-east-1.amazonaws.com/mira-buckets/avatar/1gos8le8maf.png",
    5: "https://s3.ap-east-1.amazonaws.com/mira-buckets/avatar/1gos8i8doc9.png",
    6: "https://s3.ap-east-1.amazonaws.com/mira-buckets/avatar/1gos8msca2s.png",
  };

  return avatars[item.persona];
}

export function truncateMiddle(text, length) {
  if (!text) {
    return;
  }
  if (text.length <= length) {
    return text;
  } else {
    const headLength = Math.ceil(length / 2);
    const tailLength = Math.floor(length / 2);
    return text.slice(0, headLength) + "..." + text.slice(-tailLength);
  }
}
