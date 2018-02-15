// returns frc0 upon invalid tag.
function createTag(tag=null, id=null)
{
    if(id==null)
    {
        if(isNaN(tag.replace("frc", "")))
        {
            return "frc0";
        }
        else
        {
            return tag;
        }
    }
    else if(tag==null)
    {
        if(isNaN(id))
        {
            return "frc0";
        }
        else
        {
            return "frc"+id;
        }
    }
}
module.exports.createTag = createTag;