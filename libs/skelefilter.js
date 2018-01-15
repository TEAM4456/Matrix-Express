var filter = function(message,prefix)
{
    if(message.content.startsWith(prefix))
    {
        return message;
    }
}
//skeleton code
module.exports = filter;