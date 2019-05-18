async function transfer(){
  let to = "0x98508937e528194FB4c51d2CE89F753665a23211";
  let amount = 1;
  await GenieContract.transfer(to,amount,overrides);
}
