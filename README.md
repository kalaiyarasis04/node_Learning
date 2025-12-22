# node_Learning

cmd check

mongosh ""

show dbs
show collection
use ..(db)


git filter-branch -f --env-filter '
OLD_EMAIL="kalaiyarasisomu4298@gmail.com"
CORRECT_NAME="Kalaiyarasi"
CORRECT_EMAIL="kalaiyarasis@chola.murugappa.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' -- --all


git push --force --all
git push --force --tags
