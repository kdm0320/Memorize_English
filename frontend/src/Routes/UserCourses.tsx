import { WorldSet } from "../Components/Worldset";

const datas = [
  {
    pk: "1",
    title: "토익",
    content: [
      { abbreviate: "축약하다, 단축하다" },
      { accommodate: "수용하다" },
      { "accuse A of B": "B를 이유로 A를 고발하다" },
      { acquaint: "익히다, 숙지하다" },
      { admantly: "확고하게" },
      { adequate: "적절한" },
      { adhere: "고수하다" },
      { adhesive: "점착성의" },
      { alleviate: "줄이다, 완화하다" },
      { amendment: "개정" },
    ],
  },
  {
    pk: "2",
    title: "회화",
    content: [
      { attendant: "안내원, 참석자" },
      { attentive: "주의 깊은, 경청하는" },
      { attraction: "관광명소" },
      { attribute: "~에 귀착시키다" },
      { banquet: "연회" },
      { barring: "~이 없다면, ~을 제외하고" },
      { "be eligible for": "~에 대한 자격이 있다" },
      { "be reluctant to": "~하기를 꺼리다" },
      { "become acquaint with": "~와 알게되다" },
      { belated: "때늦은" },
      { bewilder: "당황하게 하다" },
      { boast: "자랑하다" },
      { "by comparison": "비교해 보면" },
    ],
  },
];

function UserCourse() {
  return (
    <div>
      {datas.map((data) => (
        <WorldSet key={data.pk}>
          {data.title}
          <button>test</button>
        </WorldSet>
      ))}
    </div>
  );
}

export default UserCourse;
