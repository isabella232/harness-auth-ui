import { Link } from "preact-router/match";

import css from "./SignIn.module.css";

export default function SignIn() {
  return (
    <>
      <div className={css["sign-in"]}>
        Hello
        <div className={css["container"]}>
          <Link href="/hello">Link</Link>
        </div>
      </div>
    </>
  );
}
