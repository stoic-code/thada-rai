// "use client";
// import React, { useState } from "react";
// import { Card as UICard, CardHeader, CardTitle } from "../ui/card";
// import { Card, Flex, ProgressCircle, Text } from "@tremor/react";
// import { Button } from "../ui/button";
// import Link from "next/link";
//
// const MembershipCard = () => {
//   const [daysLeft, setDaysleft] = useState(200);
//   return (
//     <UICard className="m-2 bg-green-50 pb-2">
//       <CardHeader>
//         <CardTitle className="text-primary">Membership Details</CardTitle>
//       </CardHeader>
//       <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-green-50 px-8 py-2 md:flex-row">
//         <div className="flex items-center gap-4">
//           <ProgressCircle
//             value={(daysLeft / 365) * 100}
//             radius={65}
//             strokeWidth={14}
//           >
//             <span className="text-center">
//               <span className="text-3xl font-bold">{daysLeft}</span> <br /> days
//               left
//             </span>
//           </ProgressCircle>
//
//           <div className="text-foreground">
//             <div>
//               <h5 className="font-semibold">Total Days</h5>
//               <p>365</p>
//             </div>
//             <div>
//               <h5 className="font-semibold">Available Days</h5>
//               <p>{daysLeft}</p>
//             </div>
//           </div>
//         </div>
//
//         <div className="flex gap-2 text-sm text-foreground">
//           <ul className="text-right font-semibold">
//             <li>Type : </li>
//             <li>Amount : </li>
//             <li>Started on : </li>
//             <li>Expires on : </li>
//           </ul>
//           <ul>
//             <li> Yearly</li>
//             <li>NPR 1000</li>
//             <li>16th Baisakh, 2079</li>
//             <li>15th Baisakh, 2080</li>
//           </ul>
//         </div>
//
//         <div>
//           <Button asChild>
//             <Link href="#">Renew Membership</Link>
//           </Button>
//         </div>
//       </div>
//     </UICard>
//   );
// };
//
// export default MembershipCard;
