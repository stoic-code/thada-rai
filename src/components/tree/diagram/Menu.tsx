import Link from "next/link";

const Button = ({ ...props }) => {
  return (
    <button
      {...props}
      className="rounded-sm bg-primary px-2 py-1 text-sm font-medium text-white outline-none"
    />
  );
};

const Menu = ({
  person,
  isMale,
  hasWife,
  isOwner,
  isEditor,
  isUser,
  isMySon,
}: {
  person: any;
  isMale: boolean;
  hasWife: boolean;
  isOwner: boolean;
  isEditor: boolean;
  isUser: boolean;
  isMySon: boolean;
}) => {
  const isMerged = person.fatherId;
  const isTopNode = !person.fatherId;

  return (
    <div className="space-x-2 space-y-2">
      {((isOwner && !person.motherName && !isTopNode && !person.motherName) ||
        (isEditor && !person.motherName && !isTopNode)) && (
        <Button>
          <Link href={`/family/mother?child=${person.id}`}>Add mother</Link>
        </Button>
      )}

      {((isOwner && isTopNode && !isMerged) ||
        (isEditor && isTopNode && !isMerged)) && (
        <Button>
          <Link href={`/family/person?add=father&child=${person.id}`}>
            Add father
          </Link>
        </Button>
      )}

      {((isOwner && hasWife) || (isEditor && hasWife)) && (
        <Button>
          <Link
            href={`/family/daughter?fatherId=${person.id}&mother=${
              person.wives &&
              JSON.stringify(
                person.wives.map((w: any) => ({
                  id: w.id,
                  name: `${w.firstName} ${w.lastName}`,
                })),
              )
            }&person=${person.id}`}
          >
            Add Daughter
          </Link>
        </Button>
      )}

      {((isUser && isMale && hasWife) || (isEditor && hasWife)) && (
        <Button>
          <Link
            className=""
            href={`/family/person?add=son&fatherId=${person.id}&mother=${
              person.wives &&
              JSON.stringify(
                person.wives.map((w: any) => ({
                  id: w.id,
                  name: `${w.firstName} ${w.lastName}`,
                })),
              )
            }`}
          >
            Add son
          </Link>
        </Button>
      )}

      {(isUser || isMySon || (isEditor && isMale)) && (
        <Button>
          <Link href={`/family/spouse?person=${person.id}`}>Add Wife</Link>
        </Button>
      )}

      {((isOwner && !isMale && !person.husband) ||
        (isEditor && !isMale && !person.husband)) && (
        <Button>
          <Link href={`/family/inlaw?person=${person.id}`}>Add Husband</Link>
        </Button>
      )}
    </div>
  );
};

export default Menu;
